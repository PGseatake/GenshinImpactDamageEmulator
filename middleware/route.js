export default function({ store, route }) {
    const pages = [
        "equipment",
        "team",
        "bonus",
        "character",
        "weapon",
        "artifact",
        "releasenote",
    ]

    const path = route.fullPath + "/";
    for (const page of pages) {
        if (path.includes(`/${page}/`)) {
            store.commit("setPage", page);
            break;
        }
    }
}