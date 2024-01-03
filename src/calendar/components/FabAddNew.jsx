import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUIStore"

export const FabAddNew = () => {
 
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();  

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
              id: '123',
              name: 'Manuel',
            }
        });
        openDateModal();
    };


    return (
        <button onClick={handleClickNew}
        className="btn btn-primary fab"
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
