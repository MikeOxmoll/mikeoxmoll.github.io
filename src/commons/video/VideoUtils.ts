

export const formatSeconds = (seconds:number) => {
    const [hour, minute, second, sign] =
        seconds > 0
            ? [seconds / 3600, (seconds / 60) % 60, seconds % 60, '']
            : [-seconds / 3600, (-seconds / 60) % 60, -seconds % 60, '-'];

    return (
        sign +
        [hour, minute, second]
            .map(v => `${Math.floor(v)}`.padStart(2, '0'))
            .join(':')
    );
};