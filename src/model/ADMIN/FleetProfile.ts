import { DetailRowProps } from "@/app/(webapp)/app/fleet/components/detailSections/Profile";
import Model from "@/model/Model";
import { FleetProfileData } from "@/types/admin/fleet.type";

class FleetProfileDetail extends Model {
    private _instance: FleetProfileData;

    constructor(data: FleetProfileData) {
        super();
        this._instance = data;
    }
    
    get profileItems(): DetailRowProps[] {
        const fallback = "-";

        return [
            {
                label: "ID Flotte",
                value: this._instance.fleet_id ?? fallback,
            },
            {
                label: "Nom de la flotte",
                value: this._instance.fleet_name ? this.capitalizeFirstLetter(this._instance.fleet_name) : fallback,
            },
            {
                label: "Date d'ajout",
                value: this._instance.created_at ? this.formatDate(new Date(this._instance.created_at)) : fallback,
            },
            {
                label: "Type de compte",
                value: this._instance.account_type ? this.capitalizeFirstLetter(this._instance.account_type) : fallback,
            },
            {
                label: "Pays",
                value: this._instance.country ?? fallback,
            },
            {
                label: "Ville",
                value: this._instance.city ?? fallback,
            },
            {
                label: "Devise",
                value: this._instance.currency ?? fallback,
            },
            {
                label: "Propriétaire",
                value: this._instance.owner?.first_name 
                    ? `${this._instance.owner.first_name} ${this._instance.owner.last_name ?? ''}`.trim() 
                    : fallback,
            },
            {
                label: "Email",
                value: this._instance.owner_email ?? fallback,
            },
            {
                label: "Numéro de téléphone",
                value: this._instance.owner_phone ?? fallback,
            },
        ];
    }

    get id(): string {
        return this._instance.id;
    }

    get fleetId(): string {
        return this._instance.fleet_id;
    }

    get name(): string {
        return this.capitalizeFirstLetter(this._instance.fleet_name);
    }

    get ownerFullName(): string {
        return `${this._instance.owner.first_name} ${this._instance.owner.last_name}`;
    }

    get fullLocation(): string {
        return `${this._instance.city}, ${this._instance.country}`;
    }

    get email(): string {
        return this._instance.owner_email;
    }

    get phone(): string {
        return this._instance.owner_phone;
    }

    get accountType(): string {
        return this.capitalizeFirstLetter(this._instance.account_type);
    }

    get createdAt(): string {
        return this._instance.created_at;
    }

    get currency(): string {
        return this._instance.currency;
    }

    get countryCode(): string {
        return this._instance.country_code;
    }
}

export default FleetProfileDetail;