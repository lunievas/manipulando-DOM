let listaDeItens = [];
let itemAEditar

const form = document.getElementById('form-itens');
const itensInput = document.getElementById('receber-item');
const ulItens = document.getElementById('lista-de-itens');
const ulItensComprados = document.getElementById('itens-comprados');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    salvarItem();
    mostrarItens();
    itensInput.focus()
});

function salvarItem() {
    const comprasItem = itensInput.value;
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());

    if (checarDuplicado) {
        alert('Item já existe');
    } else {
        listaDeItens.push({
            valor: comprasItem,
            checar: false,
        });

    }


    itensInput.value = '';
};


function mostrarItens() {
    ulItens.innerHTML = '';
    ulItensComprados.innerHTML = '';
    listaDeItens.forEach((elemento, index) => {

        if (elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
                      
            `

        } else {

            ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : '' } ></input>
                </div>

            <div>
              ${ index === Number( itemAEditar) ? '<button onclick="salvarEdicao()"<i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>
            `
        }

    });


    const checkbox = document.querySelectorAll('input[type="checkbox"]');

    checkbox.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens[valorDoElemento].checar = evento.target.checked;
            mostrarItens();

        })
    });

    const deleteItem = document.querySelectorAll('.deletar');

    deleteItem.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens.splice(valorDoElemento, 1);
            mostrarItens();

        })
    });

    const editarItem = document.querySelectorAll('.editar');

    editarItem.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');



            mostrarItens();

        })
    });

};

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);

    listaDeItens[itemAEditar].valor = itemEditado.value;
    console.log(listaDeItens);
    itemAEditar = -1;
    mostrarItens();
}