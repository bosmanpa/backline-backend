export default function userEvents(state = [], action) {
    switch (action.type) {
        case "SET_USER_EVENTS":
            return action.events           
        default:
            return state
    }
}