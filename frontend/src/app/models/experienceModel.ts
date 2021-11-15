class ExperienceModel {
    _id!: string;
    _userId!: string;
    employer!: string;
    startDate!: Date;
    endDate!: Date;
    title!: string;
    description!: string;
    resumeDescriptions!: any;
    currentDescription!: string;
}

export default ExperienceModel;