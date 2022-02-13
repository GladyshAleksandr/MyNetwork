import { ResultCodesEnum, ResponseType } from './../API/api';
import { usersAPI } from "../API/usersAPI";
import { actions, followThunkCreator } from "./usersReducer"

jest.mock("./usersReducer"); //  after  moc UserAPI  will be fake

const  userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const  getStateMock  = jest.fn();


beforeEach (() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
    userAPIMock.unfollow.mockClear()
})



const result: ResponseType = {
    data:  {},
    messages: [],
    resultCode: ResultCodesEnum.Success,

}

    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))


test("Follow thunk souhld be success", async () => {

    const thunk = followThunkCreator(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1));
})


test("Uufollow thunk souhld be success", async () => {

    const thunk = followThunkCreator(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1));
})