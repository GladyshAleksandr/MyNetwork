import usersReducer, { actions, initialStateType } from "./usersReducer";

let state: initialStateType;

beforeEach(() => {

    state = {

        users: [
            {
                id: 0, name: "Sasha", followed: false,
                photos: { small: null, large: null }, status: "status 0"
            },
            {
                id: 1, name: "Ivan", followed: true,
                photos: { small: null, large: null }, status: "status 1"
            },
            {
                id: 2, name: "Dima", followed: true,
                photos: { small: null, large: null }, status: "status 2"
            },
            {
                id: 3, name: "Tolya", followed: false,
                photos: { small: null, large: null }, status: "status 3"
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []

    }
})


test("follow success", () => {
    const newState = usersReducer(state, actions.follow(3))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[3].followed).toBeTruthy();
})


test("unfollow success", () => {
    const newState = usersReducer(state, actions.unfollow(3))

    expect(newState.users[3].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})