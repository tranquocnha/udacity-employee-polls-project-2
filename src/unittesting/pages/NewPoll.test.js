import { fireEvent, render } from "@testing-library/react";
import { store } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPollPage from "../../pages/NewPollPage";

describe("NewPolPage", () => {
  it("should render the NewPolPage component", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all elements in Poll page", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const firstOptionLabelElement = component.getByTestId("firstOptionLabel");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const firstOptionInputElement = component.getByTestId("firstOption");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const secondOptionLabelElement = component.getByTestId("secondOptionLabel");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const secondOptionInputElement = component.getByTestId("secondOption");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButtonElement = component.getByTestId("submit");

    expect(firstOptionLabelElement.textContent).toBe("First Option");
    expect(secondOptionLabelElement.textContent).toBe("Second Option");
    expect(submitButtonElement.textContent).toBe("Submit");

    fireEvent.change(firstOptionInputElement, { target: { value: "First" } });
    fireEvent.change(secondOptionInputElement, { target: { value: "Second" } });
    expect(firstOptionInputElement.value).toBe("First");
    expect(secondOptionInputElement.value).toBe("Second");
  });

  it("submit button should be enabled when both options have been entered", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const firstOptionInputElement = component.getByTestId("firstOption");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const secondOptionInputElement = component.getByTestId("secondOption");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButtonElement = component.getByTestId("submit");

    fireEvent.change(firstOptionInputElement, { target: { value: "First" } });
    fireEvent.change(secondOptionInputElement, { target: { value: "Second" } });

    expect(submitButtonElement.disabled).toBe(false);
  });

  it("submit button should be disabled initially", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButtonElement = component.getByTestId("submit");
    expect(submitButtonElement.disabled).toBe(true);
  });
  it("submit button should be disabled false", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButtonElement = component.getByTestId("submit");
    expect(submitButtonElement.disabled).toBe(true);

    fireEvent.click(submitButtonElement);

    // Check that an error message is displayed.
    // You will need to modify this assertion based on how you are handling errors in your code.
    expect(
      // eslint-disable-next-line testing-library/prefer-screen-queries
      component.getByText("Please enter at least two options")
    ).toBeInTheDocument();
  });
});
