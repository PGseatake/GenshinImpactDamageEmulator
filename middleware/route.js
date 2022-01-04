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
    const page = pages.find((item) => path.includes(`/${item}/`))
    store.commit("page", page || "");
}