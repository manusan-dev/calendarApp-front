
export const CalendarEventBox = ({ event }) => {

    const { title, user} = event;

    return (
            <>
                <strong>{title}</strong>
                <br />
                <strong> Creado por: {user.name}</strong>
            </>
        )
}
