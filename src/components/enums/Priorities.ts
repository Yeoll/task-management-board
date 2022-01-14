enum Priorities {
    None,
    Green,
    Yellow,
    Red,
}

const getColor = (color: Priorities) => {
    switch (color) {
        case Priorities.None:
            return 'white';
        case Priorities.Green:
            return 'green';
        case Priorities.Yellow:
            return 'yellow';
        case Priorities.Red:
            return 'red';
    }
};

export { Priorities };
export { getColor };
