import React, {useRef, useState} from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonInput,
} from '@ionic/react';
import {OverlayEventDetail} from '@ionic/core/components';
import {useHistory} from 'react-router-dom';

type NewNoteModalProps = {
    ionModal: React.RefObject<HTMLIonModalElement | null>
};

const NewNoteModal: React.FC<NewNoteModalProps> = ({ionModal}) => {
    const input = useRef<HTMLIonInputElement>(null);
    const confirmButton = useRef<HTMLIonButtonElement>(null);

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    const history = useHistory();

    const confirm = () => {
        ionModal.current?.dismiss(input.current?.value, 'confirm');
    };

    const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
        if (!ionModal.current) return;
        ionModal.current.isOpen = false;
        if (event.detail.role === 'confirm') {
            history.push(`/editor/${event.detail.data}`);
        }
    };

    const markTouched = () => {
        setIsTouched(true);
    };

    const validateNoteName = (name: string) => {
        return name.match(/^[^/\\:*?<>|.]+$/g);
    };

    const validate = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        setIsValid(undefined);

        if (value === '') return;

        const valid: boolean = validateNoteName(value) !== null;
        setIsValid(valid);
    };

    const onWillPresent = () => {
        setIsTouched(false);
        setIsValid(undefined);
        if (input.current && input.current.value) {
            input.current.value = '';
        }
    };

    return (
        <IonModal ref={ionModal} onWillDismiss={onWillDismiss} onIonModalWillPresent={onWillPresent}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => ionModal.current?.dismiss()}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>New Note</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()} ref={confirmButton} disabled={!isValid}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Note Name"
                    ref={input}
                    type="text"
                    fill="outline"
                    onIonInput={validate}
                    errorText="Invalid note name"
                    onIonBlur={markTouched}
                    className={`${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                />
            </IonContent>
        </IonModal>
    );
}

export default NewNoteModal;