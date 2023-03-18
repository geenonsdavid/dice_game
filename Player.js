/**Class player */
export default class Player {
    constructor(name, id, currentScore, totalScore, select) {
        this.name = name;
        this.id = id;
        this.currentScore = currentScore;
        this.totalScore = totalScore;
        this.select = select;
    }
}