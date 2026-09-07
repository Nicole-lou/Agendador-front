import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { auth } from './firebase-config.js';

const API_URL = 'http://localhost:8080/agendamentos';

let currentUser = null;
let idToken = null;

const userInfo = document.querySelector('#user-info');
const userPhoto = document.querySelector('#user-photo');
const appointmentsContainer = document.querySelector('#user-appointments');
const clienteInput = document.querySelector('#cliente');

// Verifica se está logado assim que a página carrega
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    currentUser = user;
    idToken = await user.getIdToken();

    exibirUsuario(user);
    preencherNomeCliente(user);
    carregarAgendamentos(user);
});

function exibirUsuario(user) {
    userInfo.textContent = user.displayName || user.email;

    if (user.photoURL) {
        userPhoto.src = user.photoURL;
        userPhoto.classList.remove('d-none');
    }
}

function preencherNomeCliente(user) {
    if (user.displayName) {
        clienteInput.value = user.displayName;
        clienteInput.readOnly = true;
    }
}

async function carregarAgendamentos(user) {
    const nome = user.displayName || user.email;

    try {
        const response = await fetch(`${API_URL}/cliente/${encodeURIComponent(nome)}`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });

        if (!response.ok) throw new Error('Erro ao buscar agendamentos');

        const agendamentos = await response.json();
        renderizarAgendamentos(agendamentos);

    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
        appointmentsContainer.innerHTML =
            `<p class="text-danger">Não foi possível carregar seus agendamentos.</p>`;
    }
}

function renderizarAgendamentos(agendamentos) {
    if (!agendamentos || agendamentos.length === 0) {
        appointmentsContainer.innerHTML = `
            <div class="col-12">
                <p class="text-muted text-center">Nenhum agendamento marcado.</p>
            </div>
        `;
        return;
    }

    appointmentsContainer.innerHTML = agendamentos.map(ag => {
        const dataHora = new Date(ag.dataHoraAgendamento);
        const dataFormatada = dataHora.toLocaleDateString('pt-BR');
        const horaFormatada = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return `
            <div class="col-md-6">
                <div class="card appointment-card p-3">
                    <h6 class="fw-bold mb-1">${ag.servico}</h6>
                    <p class="mb-1 text-muted">Profissional: ${ag.profissional}</p>
                    <p class="mb-0"><i class="fas fa-calendar"></i> ${dataFormatada} às ${horaFormatada}</p>
                </div>
            </div>
        `;
    }).join('');
}

window.bookAppointment = async function () {
    const servico = document.querySelector('#service').value;
    const profissional = document.querySelector('#professional').value;
    const data = document.querySelector('#date').value;
    const hora = document.querySelector('#time').value;
    const cliente = clienteInput.value.trim();
    const telefoneCliente = document.querySelector('#telefoneCliente').value.trim();

    if (!cliente || !telefoneCliente) {
        alert('Preencha seu nome e telefone.');
        return;
    }

    const dataHoraAgendamento = `${data}T${hora}:00`;
    const payload = { servico, profissional, dataHoraAgendamento, cliente, telefoneCliente };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const erro = await response.json().catch(() => null);
            throw new Error(erro?.message || 'Erro ao criar agendamento');
        }

        document.querySelector('#modal-details').textContent =
            `${servico} com ${profissional} em ${new Date(data).toLocaleDateString('pt-BR')} às ${hora}`;

        new bootstrap.Modal(document.querySelector('#successModal')).show();

        carregarAgendamentos(currentUser);

    } catch (error) {
        console.error('Erro ao agendar:', error);
        alert(error.message || 'Não foi possível concluir o agendamento. Tente novamente.');
    }
};

window.closeModal = function () {
    const modalEl = document.querySelector('#successModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
};

window.logout = function () {
    signOut(auth)
        .then(() => window.location.href = 'login.html')
        .catch((error) => console.error('Erro ao sair:', error));
};