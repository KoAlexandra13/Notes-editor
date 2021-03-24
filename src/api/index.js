export const getDataRequest = () => {
    return fetch(`http://localhost:8000/data`,{
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "method": "GET"
    }).then((response) => response.json());
};

export const deleteNoteRequest = (id) => {
    return fetch(`http://localhost:8000/data/${id}`,{
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "method": "DELETE"
    }).then((response) => response.json());
};

export const addNewNoteRequest = (note) => {
    return fetch(`http://localhost:8000/data`,{
        "body": JSON.stringify(note),
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "method": "POST"
    }).then((response) => response.json());
}

export const editNoteRequest = (id, note) => {
    return fetch(`http://localhost:8000/data/${id}`,{
        "body": JSON.stringify(note),
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "method": "PATCH"
    }).then((response) => response.json());
}
