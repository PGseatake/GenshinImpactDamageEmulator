export default ({ store, route }) => {
    const pages = [
        "equipment",
        "team",
        "bonus",
        "damage",
        "character",
        "weapon",
        "artifact",
        "howto",
        "setting",
        "releasenote",
    ]

    const path = route.fullPath + "/";
    for (const page of pages) {
        if (path.includes(`/${page}/`)) {
            store.commit("page", page);
            break;
        }
    }
}