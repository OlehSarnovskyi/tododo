import {ID} from "../models/id";

export function generateID(): ID {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}