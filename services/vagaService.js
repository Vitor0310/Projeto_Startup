// services/vagaService.js

// Mock data para as vagas de garagem
const vagas = [
  {
    id: '1',
    nome: 'Vaga Perto do Shopping',
    endereco: 'Rua da Amizade, 100',
    localizacao: {
      latitude: -23.55052,
      longitude: -46.63330
    },
    precoPorHora: 10.50,
    tipo: 'coberta',
    descricao: 'Vaga coberta e segura, a 5 minutos a pé do Shopping Central.',
    fotos: [
      'https://via.placeholder.com/150/0000FF/FFFFFF?text=Vaga+1',
      'https://via.placeholder.com/150/0000FF/FFFFFF?text=Vaga+1'
    ],
  },
  {
    id: '2',
    nome: 'Garagem no Centro',
    endereco: 'Avenida Brasil, 456',
    localizacao: {
      latitude: -23.551,
      longitude: -46.634
    },
    precoPorHora: 12.00,
    tipo: 'descoberta',
    descricao: 'Vaga ampla, bem no centro da cidade. Ideal para quem trabalha na região.',
    fotos: [
      'https://via.placeholder.com/150/FF0000/FFFFFF?text=Vaga+2',
      'https://via.placeholder.com/150/FF0000/FFFFFF?text=Vaga+2'
    ],
  },
  // Adicione mais vagas aqui com a propriedade localizacao!
];

export function getAllVagas() {
  return vagas;
}

export function getVagaById(id) {
  return vagas.find(vaga => vaga.id === id);
}