
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon 2',
            location: {
                lat: 13.0938773,
                lng: 77.6421572,
            },
        },
        // {
        //     name: 'Main Gate',
        //     location: {
        //         lat: 13.084738, 
        //         lng: 77.643521,
        //     },
        // },{
        //     name: 'Pokèmon 1',
        //     location: {
        //         lat: 13.0928773,
        //         lng: 77.6411572,
        //     },
        // },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.9 0.9 0.9',
        info: 'Magnemite, 0.9',
        rotation: '0 0 0',
        position: '0 1 -2',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 0 0',
        info: 'Articuno, 0.5',
        position: '0 1 -2',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 0 0',
        info: 'Dragonite,0.2',
        position: '0 1 -2',
    },
    {
        url: './assets/donut/donut.glb',
        scale: '2 2 2',
        rotation: '0 0 0',
        info: 'Donut',
        position: '0 1 -2',
    },
];

var modelIndex = 0;
var setModel = function (model, entity, place) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info + " (" + place.name + ")";
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-new-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model, place);

        model.setAttribute('animation-mixer', '');
        model.setAttribute('look-at', '[gps-camera]');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-new-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity, place);
        });

        scene.appendChild(model);
    });
}