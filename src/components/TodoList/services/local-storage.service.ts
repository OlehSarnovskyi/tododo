export function getTododoList(): any[] {
    return JSON.parse(localStorage.getItem('tododoList')) || []
}