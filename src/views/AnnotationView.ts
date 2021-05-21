import Annotation from '../models/Annotation';

class AnnotationView {
  details(annotation: Annotation) {
    const data = {
      id: annotation.id,
      description: annotation.description,
      userId: annotation.userId,
    };

    if (annotation.disease) {
      const disease = {
        id: annotation.disease.id,
        name: annotation.disease.name,
      };
      return { ...data, disease };
    }

    return data;
  }
}

export default AnnotationView;
