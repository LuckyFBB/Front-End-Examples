import dependenceManager from "./dependenceManager";

export default function autorun(handler: () => void) {
    dependenceManager.beginCollect(handler);
    handler();
    dependenceManager.endCollect();
}
