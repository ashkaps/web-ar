
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        // {
        //     name: 'Aish',
        //     location: {
        //          lat: 13.084793,
        //          lng:  77.64371,
        //     },
        // },
        {
            name: 'NH Entry Gate',
            location: {
                 lat: 13.084787,
                 lng:  77.643533,
            },
        }
        // ,{
        //     name: 'NH Exit Gate Circle',
        //     location: {
        //          lat: 13.083952,
        //          lng: 77.645349
        //     },
        // },{
        //     name: 'NH Entry Crossing',
        //     location: {
        //          lat: 13.081931, 
        //          lng:  77.641913
        //     },
        // },{
        //     name: 'Leela',
        //     location: {
        //          lat: 13.084154,
        //          lng:  77.643268
        //     },
        // },{
        //     name: 'Leela',
        //     location: {
        //          lat: 13.084154,
        //          lng:  77.643268
        //     },
        // },
        // {
        //     name: 'Park',
        //     location: {
        //          lat: 13.083344, 
        //          lng:  77.642232
        //     },
        // },
        // {
        //     name: 'Yonatan',
        //     location: {
        //          lat: 46.26720554667716,
        //          lng: 15.539284518998622,
        //     },
        // },
        // {
        //     name: 'Astro Park',
        //     location: {
        //          lat: 13.084640, 
        //          lng: 77.641765
        //     },
        // },
    ];
}

// var models = [
//     {
//         url: './assets/magnemite/scene.gltf',
//         scale: '0.5 0.5 0.5',
//         info: 'Magnemite, Lv. 5, HP 10/10',
//         rotation: '0 180 0',
//     },
//     {
//         url: './assets/articuno/scene.gltf',
//         scale: '0.2 0.2 0.2',
//         rotation: '0 180 0',
//         info: 'Articuno, Lv. 80, HP 100/100',
//     },
//     {
//         url: './assets/dragonite/scene.gltf',
//         scale: '0.08 0.08 0.08',
//         rotation: '0 180 0',
//         info: 'Dragonite, Lv. 99, HP 150/150',
//     }, {
//         url: './assets/donut/Krapfen2.glb',
//         scale: '0.08 0.08 0.08',
//         rotation: '0 180 0',
//         info: 'Donut, Lv. 99, HP 150/150',
//     },
// ];

var models = [
        {
        url: './assets/articuno/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        // position: '0 10 0',
        info: 'Articuno 0.5',
    }, {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        // position: '0 10 0',
        info: 'Articuno 0.2',
    }, 
        {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '1.0 1.0 1.0',
        rotation: '0 180 0',
        // position: '0 10 0',
        info: 'Articuno 1.0',
    }, 
    {
        url: './assets/donut/Donnut.obj',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
         position: '0 10 0',
        info: 'Donut, Lv. 99, HP 150/150',
    },
    {
        url: './assets/donut/Donnut1.glb',
        scale: '0.1 0.1 0.1',
        rotation: '0 180 0',
         position: '0 10 0',
        info: 'Donut p10 r180 0.1',
    },
    {
        url: './assets/donut/Donnut1.glb',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
         position: '0 100 0',
        info: 'Donut p100 r180 0.5',
    },
    {
        url: './assets/donut/Donnut1.glb',
        scale: '0.3 0.3 0.3',
        rotation: '0 0 0',
         position: '0 0 0',
        info: 'Donut r0 p0 0.3',
    }
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
        console.log('Model Index: ' + modelIndex);
        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-new-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            console.log('New Model Index: ' + newIndex);
            setModel(models[newIndex], entity, place);
        });

        scene.appendChild(model);
    });
}
