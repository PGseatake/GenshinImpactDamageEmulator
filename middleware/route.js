export default function({ store, route }) {
    const pages = [
        "character",
        "weapon",
        "artifact",
        "releasenote",
    ]

    const path = route.fullPath + "/";
    for (const page of pages) {
        if (path.includes(`/${page}/`)) {
            store.page = page;
            break;
        }
    }
}