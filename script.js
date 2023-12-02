
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Home',
            location: {
                 lat: 13.0847818,
                 lng: 77.6437249,
            },
        },{
            name: 'NH Exit Gate',
            location: {
                 lat: 13.083962,
                 lng:  77.645329
            },
        },{
            name: 'Discovery Center',
            location: {
                 lat: 13.082579,
                 lng:  77.642296
            },
        },{
            name: 'NH Park',
            location: {
                 lat: 13.084206,
                 lng:  77.642021
            },
        },{
            name: 'Leela',
            location: {
                 lat: 13.084501,
                 lng: 77.643566,
            },
        },{
            name: 'Astro Park',
            location: {
                 lat: 13.085383, 
                 lng: 77.641971,
            },
        },
    ];
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    }, {
        url: './assets/donut/scene.glb',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Donut, Lv. 99, HP 150/150',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
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
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}
