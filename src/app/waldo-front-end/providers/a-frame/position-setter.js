AFRAME.registerComponent('position-setter', {
    init: function () {
        console.log('position-setter init')

        this.el.addEventListener('model-loaded', () => {
            // compute the box that contains the model
            const box = new THREE.Box3().setFromObject(document.getElementById("model").object3D);
            const boxSizes = box.getSize(new THREE.Vector3());

            // compute the max size of the box (x, y, z)
            // it will be used to set model position
            const maxBoxSize = Math.max(boxSizes.x, boxSizes.y, boxSizes.z);

            console.log(boxSizes);

            let model = document.getElementById("model");
            model.setAttribute("position", "0 0 -" + 1.2 * maxBoxSize);
        })
    }
})
