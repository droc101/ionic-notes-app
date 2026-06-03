import React, {useRef} from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
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

    const history = useHistory();

    function confirm() {
        ionModal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
        if (!ionModal.current) return;
        ionModal.current.isOpen = false;
        if (event.detail.role === 'confirm') {
            history.push(`/editor/${event.detail.data}`);
        }
    }

    function onNoteNameChanged() {
        if (input.current && confirmButton.current && input.current.value) {
            // TODO: better validation (existing notes, valid filenames, etc.)
            confirmButton.current.disabled = input.current.value.toString().length == 0;
        }
    }

    return (
        <IonModal ref={ionModal} onWillDismiss={(event) => onWillDismiss(event)}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => ionModal.current?.dismiss()}>Cancel</IonButton>
                    </IonButtons>
                    <IonTitle>New Note</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()} ref={confirmButton} disabled>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonInput
                        placeholder="Note Name"
                        ref={input}
                        type="text"
                        fill="outline"
                        onIonInput={onNoteNameChanged}
                    />
                </IonItem>
            </IonContent>
        </IonModal>
    );
}

export default NewNoteModal;