import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus"


describe ("after creation <span/>  should be displayed ", () => {

    test("status from props should be in state", () => {
        const component = create(<ProfileStatus status= "it.com" />)
        const root = component.root; // берем екземпляр обьекта
        let span  = root.findByType("span");
        expect(span).toBeNull();
    })


    test("status from props should be in state", () => {
        const component = create(<ProfileStatus status= "it.com" />)
        const root = component.root; // берем екземпляр обьекта
        expect(() => {
        let input  = root.findByType("input");
       }).toThrow();
    })


    test("after creation <span/>  should contains correct status", () => {
        const component = create(<ProfileStatus status= "it.com" />)
        const root = component.root; // берем екземпляр обьекта
        let span  = root.findByType("span");
        expect(span.children[0]).toBe("it.com");
    })


    test("<input> should be displayed in edit mode instead of <span>", () => {
        const component = create(<ProfileStatus status= "it.com" />)
        const root = component.root; // берем екземпляр обьекта
        let span  = root.findByType("span");
        span.props.onDoubleClick();
        let input  = root.findByType("input");

        expect(input.props.value).toBe("it.com");
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status= "it.com" updateStatus = {mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();

        expect(mockCallback.mock.calls.length).toBe(1);
    })

});




