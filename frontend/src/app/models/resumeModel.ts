class ResumeModel {
    _id!: string;
    _userId!: string;
    title!: string;
    skills!: Array<string>;
    education!: string;
    experience!: Array<Map<string, string>>
}

export default ResumeModel;