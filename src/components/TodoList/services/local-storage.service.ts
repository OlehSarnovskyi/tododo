import {List} from "../models/list";

export function getTododoList(): List.Group[] {
    return JSON.parse(localStorage.getItem('tododoList')) || []
}