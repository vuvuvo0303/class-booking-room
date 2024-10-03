export function getRandomColor(inputString: string, seed: number = 69) {
    const colors = [
        "rose", "pink", "fuchsia", "purple", "violet",
        "indigo", "blue", "sky", "cyan", "teal",
        "emerald", "green", "lime", "yellow", "amber",
        "orange", "red", "gray"
    ];
    function hashString(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash = hash & hash; 
        }
        return (hash + seed) % colors.length;
    }

    const index = hashString(inputString);
    return colors[index];
}
