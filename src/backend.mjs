import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-prix',
        });
        data = data.map((offre) => {
            offre.img = pb.files.getURL(offre, offre.images);
            return offre;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}