// @flow
import { get, mock } from "src/helpers/api";
import env from "config/env";

const { API_URL, USE_MOCK_API } = env;

export const getTodosMock = () =>
  mock({
    data: [
      {
        text: "This is the first todo",
        date: "2016-12-12T20:22:54Z",
        done: false
      },
      {
        text: "This is the second todo",
        done: false
      },
      {
        text: "This is the third todo",
        done: false
      },
      {
        text: 'This is todo has "double-quotes"',
        done: false
      },
      {
        text: "This one's done",
        done: true
      }
    ]
  });

export const getTodos = () =>
  USE_MOCK_API ? getTodosMock() : get(`${API_URL}/todos`);
