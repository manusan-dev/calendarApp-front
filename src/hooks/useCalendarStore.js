import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    };

    const startSavingEvent = async( calendarEvent ) => {
            // todo: llegar al backend
            
            if( calendarEvent._id ){ // si ya existe, update
                dispatch( onUpdateEvent({...calendarEvent}) )
            } else {
                // creando
                dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
                
            };
    };

    const startDeletingEvent = () => {
        // todo llegar al backend
        dispatch(onDeleteEvent());
    }

    return  {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
