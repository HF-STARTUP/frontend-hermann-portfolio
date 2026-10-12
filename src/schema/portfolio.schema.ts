import Joi from "joi";
import { _JoiConfig } from "@/schema/_joiConfig";
import { getYoutubeVideoId } from "@/utils/media";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** URL http(s) OU dataURL d'image (imports locaux de l'admin) OU vide.
    TODO backend.hermannfomo.dev : ne garder que des URLs hébergées une
    fois l'upload serveur en place. */
const optionalImage = Joi.string()
    .allow("")
    .custom((value, helpers) => {
        if (!value) return value;
        if (value.startsWith("data:image/")) return value;
        if (/^https?:\/\/.+/.test(value)) return value;
        return helpers.error("any.invalid");
    })
    .messages({
        "any.invalid": `L'image doit être un import local ou une URL valide (http/https)`,
    });

const optionalUrl = Joi.string()
    .uri({ scheme: ["http", "https"] })
    .allow("")
    .messages({
        'string.uri': `L'URL doit être valide (http/https)`,
    });

/* ------------------------------------------------------------------ */
/* Projets (formulaire admin)                                          */
/* ------------------------------------------------------------------ */

export type ProjectFormInputs = {
    title: string;
    role: string;
    description: string;
    category: string;
    imageUrl: string;
    demoUrl: string;
    githubUrl: string;
    /** Technologies sélectionnées via le TagInput (badges) */
    techStack: string[];
}

export const projectFormSchema = Joi.object({
    title: _JoiConfig.strRequired.messages({
        'string.empty': `Le titre est requis`,
    }),
    role: _JoiConfig.strRequired.messages({
        'string.empty': `Le rôle est requis`,
    }),
    description: Joi.string().min(10).required().messages({
        'string.empty': `La description est requise`,
        'string.min': `La description doit contenir au moins 10 caractères`,
    }),
    // Validé côté UI contre les catégories du store (gérées dans /admin/categories)
    category: Joi.string().required().messages({
        'any.required': `La catégorie est requise`,
        'string.empty': `La catégorie est requise`,
    }),
    imageUrl: optionalImage,
    demoUrl: optionalUrl,
    githubUrl: optionalUrl,
    techStack: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
            'array.min': `Sélectionnez au moins une technologie`,
            'any.required': `Sélectionnez au moins une technologie`,
        }),
});

/* ------------------------------------------------------------------ */
/* Technologies (formulaire admin)                                     */
/* ------------------------------------------------------------------ */

export type TechnologyFormInputs = {
    name: string;
    categoryId: string;
    imageUrl: string;
}

export const technologyFormSchema = Joi.object({
    name: _JoiConfig.strRequired.messages({
        'string.empty': `Le nom est requis`,
    }),
    // Choix parmi les catégories gérées dans /admin/categories
    categoryId: Joi.string().required().messages({
        'any.required': `La catégorie est requise`,
        'string.empty': `La catégorie est requise`,
    }),
    imageUrl: optionalImage,
});

/* ------------------------------------------------------------------ */
/* Articles de blog (formulaire admin)                                 */
/* ------------------------------------------------------------------ */

export type PostFormInputs = {
    title: string;
    slug: string;
    excerpt: string;
    coverType: string;
    coverImageUrl: string;
    coverVideoUrl: string;
    coverYoutubeUrl: string;
    /** Tags sélectionnés via le TagInput (badges, saisie libre) */
    tags: string[];
    readTimeMinutes: number;
    contentText: string;
}

const requiredVideoUrl = Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required()
    .messages({
        'string.uri': `L'URL de la vidéo doit être valide (http/https)`,
        'any.required': `Le lien de la vidéo est requis pour une couverture vidéo`,
        'string.empty': `Le lien de la vidéo est requis pour une couverture vidéo`,
    });

const requiredYoutubeUrl = Joi.string()
    .required()
    .custom((value, helpers) => {
        if (!getYoutubeVideoId(value ?? "")) return helpers.error('any.invalid');
        return value;
    })
    .messages({
        'any.invalid': `Lien YouTube invalide (ex: https://www.youtube.com/watch?v=...)`,
        'any.required': `Le lien YouTube est requis pour une couverture YouTube`,
        'string.empty': `Le lien YouTube est requis pour une couverture YouTube`,
    });

export const postFormSchema = Joi.object({
    title: _JoiConfig.strRequired.messages({
        'string.empty': `Le titre est requis`,
    }),
    slug: Joi.string()
        .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .required()
        .messages({
            'string.empty': `Le slug est requis`,
            'string.pattern.base': `Slug invalide : minuscules et tirets uniquement (ex: mon-article)`,
        }),
    excerpt: Joi.string().min(10).required().messages({
        'string.empty': `L'extrait est requis`,
        'string.min': `L'extrait doit contenir au moins 10 caractères`,
    }),
    coverType: Joi.string()
        .valid("image", "video", "youtube")
        .required()
        .messages({
            'any.only': `Type de couverture invalide`,
            'any.required': `Le type de couverture est requis`,
        }),
    // Image de couverture (aussi utilisée comme poster pour vidéo/YouTube)
    coverImageUrl: optionalImage,
    coverVideoUrl: Joi.string().when("coverType", {
        is: "video",
        then: requiredVideoUrl,
        otherwise: optionalUrl,
    }),
    coverYoutubeUrl: Joi.string().when("coverType", {
        is: "youtube",
        then: requiredYoutubeUrl,
        otherwise: optionalUrl,
    }),
    tags: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
            'array.min': `Indiquez au moins un tag`,
            'any.required': `Indiquez au moins un tag`,
        }),
    readTimeMinutes: Joi.number().integer().min(1).max(120).required().messages({
        'number.base': `Temps de lecture requis`,
        'number.min': `Minimum 1 minute`,
        'number.max': `Maximum 120 minutes`,
        'any.required': `Temps de lecture requis`,
    }),
    contentText: Joi.string().min(20).required().messages({
        'string.empty': `Le contenu est requis`,
        'string.min': `Le contenu doit contenir au moins 20 caractères`,
    }),
});

/* ------------------------------------------------------------------ */
/* Parcours — expériences, formations, certifications (formulaire admin) */
/* ------------------------------------------------------------------ */

const monthYear = Joi.string()
    .pattern(/^\d{4}-\d{2}$/)
    .required()
    .messages({
        'string.empty': `Ce champ est requis`,
        'string.pattern.base': `Format attendu : YYYY-MM`,
    });

const dateString = Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
        'string.empty': `Ce champ est requis`,
        'string.pattern.base': `Format attendu : YYYY-MM-DD`,
    });

export type ExperienceFormInputs = {
    company: string;
    position: string;
    location: string;
    description: string;
    startDate: string;
    endDate: string;     // "" = actuellement
    sortOrder: number;
};

export const experienceFormSchema = Joi.object({
    company: _JoiConfig.strRequired,
    position: _JoiConfig.strRequired,
    location: _JoiConfig.strOptionnal,
    description: Joi.string().min(10).required().messages({
        'string.empty': `La description est requise`,
        'string.min': `La description doit contenir au moins 10 caractères`,
    }),
    startDate: monthYear,
    endDate: Joi.string().pattern(/^\d{4}-\d{2}$/).allow("").messages({
        'string.pattern.base': `Format attendu : YYYY-MM ou laisser vide (actuel)`,
    }),
    sortOrder: Joi.number().integer().min(0).default(0),
});

export type EducationFormInputs = {
    school: string;
    degree: string;
    description: string;
    startDate: string;
    endDate: string;     // "" = actuellement
    sortOrder: number;
};

export const educationFormSchema = Joi.object({
    school: _JoiConfig.strRequired,
    degree: _JoiConfig.strRequired,
    description: _JoiConfig.strOptionnal,
    startDate: monthYear,
    endDate: Joi.string().pattern(/^\d{4}-\d{2}$/).allow("").messages({
        'string.pattern.base': `Format attendu : YYYY-MM ou laisser vide (actuel)`,
    }),
    sortOrder: Joi.number().integer().min(0).default(0),
});

export type CertificationFormInputs = {
    name: string;
    issuer: string;
    description: string;
    dateObtained: string;
    url: string;
    imageUrl: string;
    sortOrder: number;
};

export const certificationFormSchema = Joi.object({
    name: _JoiConfig.strRequired,
    issuer: _JoiConfig.strRequired,
    description: _JoiConfig.strOptionnal,
    dateObtained: dateString,
    url: optionalUrl,
    imageUrl: optionalImage,
    sortOrder: Joi.number().integer().min(0).default(0),
});
