function getDateWithOffset(daysToAdd) {
    const date = new Date();

    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + daysToAdd);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const services = [
    {
        id: "harmonizacao",
        name: "Harmonização Facial",
        category: "Facial",
        description:
            "Plano personalizado para valorizar proporções, contornos e pontos de luz com resultado elegante e natural.",
        duration: 75,
        price: 890,
        image:
            "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=85",
        featured: true,
    },
    {
        id: "bioestimulador",
        name: "Bioestimulador de Colágeno",
        category: "Facial",
        description:
            "Estímulo progressivo de colágeno para firmeza, sustentação e melhora da qualidade da pele.",
        duration: 60,
        price: 1290,
        image:
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=85",
        featured: true,
    },
    {
        id: "laser",
        name: "Laser de Alta Performance",
        category: "Laser",
        description:
            "Tecnologia para uniformização do tom, melhora da textura, dos poros e revitalização da pele.",
        duration: 50,
        price: 690,
        image:
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85",
        featured: true,
    },
    {
        id: "drenagem",
        name: "Drenagem Premium",
        category: "Corporal",
        description:
            "Técnica exclusiva para conforto, redução de retenção e sensação imediata de leveza.",
        duration: 60,
        price: 240,
        image:
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=85",
        featured: false,
    },
    {
        id: "criolipolise",
        name: "Criolipólise 360º",
        category: "Corporal",
        description:
            "Protocolo corporal com avaliação de medidas, planejamento das áreas e acompanhamento da evolução.",
        duration: 90,
        price: 790,
        image:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
        featured: false,
    },
    {
        id: "terapia-capilar",
        name: "Terapia Capilar Integrada",
        category: "Capilar",
        description:
            "Avaliação do couro cabeludo e protocolo combinado para força, densidade e saúde dos fios.",
        duration: 60,
        price: 390,
        image:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
        featured: false,
    },
];

export const professionals = [
    {
        id: "dra-helena",
        name: "Dra. Helena Martins",
        role: "Biomédica Esteta",
        specialties: [
            "Harmonização",
            "Bioestimuladores",
            "Laser",
        ],
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: "dra-camila",
        name: "Dra. Camila Azevedo",
        role: "Fisioterapeuta Dermatofuncional",
        specialties: [
            "Estética corporal",
            "Pós-procedimento",
            "Drenagem",
        ],
        image:
            "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: "dra-laura",
        name: "Dra. Laura Nunes",
        role: "Especialista em Saúde Capilar",
        specialties: [
            "Terapia capilar",
            "Tricoscopia",
            "Protocolos integrados",
        ],
        image:
            "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=85",
    },
];

export const testimonials = [
    {
        id: 1,
        text:
            "A experiência foi impecável desde a avaliação. O plano foi explicado com clareza e o resultado ficou muito natural.",
        author: "Renata M.",
    },
    {
        id: 2,
        text:
            "Ambiente acolhedor, equipe cuidadosa e acompanhamento de verdade. Senti segurança em todas as etapas.",
        author: "Juliana R.",
    },
    {
        id: 3,
        text:
            "O agendamento foi simples e a clínica respeitou meu tempo. Atendimento sofisticado sem perder a proximidade.",
        author: "Fernanda C.",
    },
];

export const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:30",
    "14:30",
    "15:30",
    "16:30",
    "17:30",
];

export const appointmentStatuses = [
    "Pendente",
    "Confirmado",
    "Em atendimento",
    "Concluído",
    "Cancelado",
    "Não compareceu",
];

export const demoAppointments = [
    {
        code: "LUM-8142",
        serviceId: "harmonizacao",
        professionalId: "dra-helena",
        date: getDateWithOffset(0),
        time: "10:00",
        clientName: "Marina Costa",
        phone: "(11) 98844-1172",
        email: "marina@example.com",
        notes: "Primeira avaliação.",
        status: "Confirmado",
        createdAt: new Date().toISOString(),
    },
    {
        code: "LUM-5027",
        serviceId: "drenagem",
        professionalId: "dra-camila",
        date: getDateWithOffset(0),
        time: "14:30",
        clientName: "Patrícia Almeida",
        phone: "(11) 99751-3408",
        email: "patricia@example.com",
        notes: "",
        status: "Pendente",
        createdAt: new Date().toISOString(),
    },
    {
        code: "LUM-3291",
        serviceId: "terapia-capilar",
        professionalId: "dra-laura",
        date: getDateWithOffset(1),
        time: "11:00",
        clientName: "Luciana Prado",
        phone: "(11) 98302-9087",
        email: "luciana@example.com",
        notes:
            "Relata aumento de queda capilar nos últimos meses.",
        status: "Confirmado",
        createdAt: new Date().toISOString(),
    },
];