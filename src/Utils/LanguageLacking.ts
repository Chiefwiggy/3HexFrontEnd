

export class Utils {

    private static instance: Utils

    private constructor() {}

    private static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }

    public static Clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }
}