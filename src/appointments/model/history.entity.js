/* 
"diagnostico": "Problemas de estómago",
"motivoConsulta": "Vómitos ocasionales, pérdida de apetito",
"tratamiento": "Dieta blanda por 48 horas",
"observaciones": "Monitorear signos de empeoramiento.",
*/

export class History {
    constructor({ diagnosis, reasonConsultation, treatment, observations }) {
        this.diagnosis = diagnosis;
        this.reasonConsultation = reasonConsultation;
        this.treatment = treatment;
        this.observations = observations;
    }
}