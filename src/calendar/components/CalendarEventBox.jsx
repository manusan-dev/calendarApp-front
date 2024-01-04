
export const CalendarEventBox = ({ event }) => {

    const { title, creator, user} = event;

    if(creator.name == null){
        creator.name = user.name;
    }
    return (
            <>
                <strong>{title}</strong>
                <br />
                <strong> Creado por: {creator.name}</strong>
            </>
        )
}
