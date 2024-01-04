import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from "./useUIStore";
import { useCalendarStore } from "./useCalendarStore";

export const CalendarHook = () => {

    const { closeDateModal } = useUiStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false)



    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });


    useEffect(() => {

        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])


    const titleClass = useMemo(() => {  // utiliza el MEMO para guardar el valor del title y retorna la clase de acuerdo al length
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.title, formSubmitted]);



    const noteClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.notes.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.notes, formSubmitted]);



    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        }
        )
    };


    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    };


    const { isDateModalOpen } = useUiStore();


    const onCloseModal = () => {
        closeDateModal();
    };






    const onSubmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || (difference < 0)) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        };

        if (formValues.title.length <= 0) {
            Swal.fire('Título inválido', 'Debes ingresar un título', 'error');
            return;
        };

        if (formValues.notes.length <= 0) {
            Swal.fire('Nota inválida', 'Debes ingresar una nota', 'error');
            return;
        };
        
        
        console.log(formValues);

        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
    };

    return {
        formSubmitted, setFormSubmitted,
        titleClass, noteClass,
        onInputChanged, onDateChanged, onSubmit, onCloseModal, isDateModalOpen,
        formValues, setFormValues,
        startSavingEvent
    }

}