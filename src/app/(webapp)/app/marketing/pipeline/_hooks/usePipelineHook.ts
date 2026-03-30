import { KpiItem } from "@/components/display/Kpi"
import React, { useCallback, useMemo, useState } from "react"
import { Users } from "lucide-react"
import Badge from "@/components/display/Badge"
import { Column, RowAction } from "@/components/display/CustomTableDisplay"

export type CustomerStatus = "lead_converted" | "onboarding" | "active" | "stable" | "risked" | "inactive"
export interface CustomerItem{
    convertedAt: string,
    name: string,
    email: string,
    phoneNum: string,
    companyName: string,
    channelName: string,
    assignedCommercial: string,
    status: CustomerStatus
}

export const usePipelineHook = ()=>{
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem>()

    const customersList: CustomerItem[] = [
        {
          convertedAt: "2024-01-15T09:30:00Z",
          name: "Jean Dupont",
          email: "jean.dupont@transportplus.com",
          phoneNum: "+33 6 12 34 56 78",
          companyName: "Transport Plus",
          channelName: "Site Web",
          assignedCommercial: "Sophie Martin",
          status: "active"
        },
        {
          convertedAt: "2024-01-20T14:15:00Z",
          name: "Marie Lambert",
          email: "m.lambert@logisticpro.fr",
          phoneNum: "+33 6 23 45 67 89",
          companyName: "Logistic Pro",
          channelName: "LinkedIn",
          assignedCommercial: "Thomas Bernard",
          status: "stable"
        },
        {
          convertedAt: "2024-02-01T11:45:00Z",
          name: "Pierre Moreau",
          email: "pierre.moreau@gmail.com",
          phoneNum: "+33 7 89 12 34 56",
          companyName: "VTC Services",
          channelName: "Référence",
          assignedCommercial: "Sophie Martin",
          status: "onboarding"
        },
        {
          convertedAt: "2024-02-10T16:20:00Z",
          name: "Isabelle Rousseau",
          email: "i.rousseau@fleetmanager.fr",
          phoneNum: "+33 6 45 67 89 01",
          companyName: "Fleet Manager",
          channelName: "Salon professionnel",
          assignedCommercial: "Nicolas Petit",
          status: "active"
        },
        {
          convertedAt: "2024-02-15T10:00:00Z",
          name: "Lucas Bernard",
          email: "lucas.bernard@taxi-express.com",
          phoneNum: "+33 7 56 78 90 12",
          companyName: "Taxi Express",
          channelName: "Site Web",
          assignedCommercial: "Thomas Bernard",
          status: "lead_converted"
        },
        {
          convertedAt: "2023-12-05T09:15:00Z",
          name: "Sophie Dubois",
          email: "s.dubois@deliveryplus.fr",
          phoneNum: "+33 6 78 90 12 34",
          companyName: "Delivery Plus",
          channelName: "Email marketing",
          assignedCommercial: "Sophie Martin",
          status: "risked"
        },
        {
          convertedAt: "2024-01-25T13:30:00Z",
          name: "Thomas Leroy",
          email: "thomas.leroy@coursiers-city.com",
          phoneNum: "+33 7 34 56 78 90",
          companyName: "Coursiers City",
          channelName: "Google Ads",
          assignedCommercial: "Nicolas Petit",
          status: "active"
        },
        {
          convertedAt: "2024-02-18T11:00:00Z",
          name: "Amélie Fournier",
          email: "a.fournier@mobilitepro.fr",
          phoneNum: "+33 6 90 12 34 56",
          companyName: "Mobilité Pro",
          channelName: "LinkedIn",
          assignedCommercial: "Marie Dubois",
          status: "onboarding"
        },
        {
          convertedAt: "2023-11-10T15:45:00Z",
          name: "Nicolas Girard",
          email: "n.girard@transports-girard.com",
          phoneNum: "+33 6 56 78 90 12",
          companyName: "Transports Girard",
          channelName: "Bouche à oreille",
          assignedCommercial: "Thomas Bernard",
          status: "inactive"
        },
        {
          convertedAt: "2024-01-05T08:30:00Z",
          name: "Claire Martinez",
          email: "claire.martinez@logivtc.com",
          phoneNum: "+33 7 45 67 89 01",
          companyName: "LogiVTC",
          channelName: "Site Web",
          assignedCommercial: "Sophie Martin",
          status: "stable"
        },
        {
          convertedAt: "2024-02-22T14:00:00Z",
          name: "Antoine Richard",
          email: "a.richard@fleet360.fr",
          phoneNum: "+33 6 67 89 01 23",
          companyName: "Fleet 360",
          channelName: "Salon professionnel",
          assignedCommercial: "Marie Dubois",
          status: "lead_converted"
        },
        {
          convertedAt: "2024-01-30T10:15:00Z",
          name: "Élodie Roche",
          email: "e.roche@vtcpremium.com",
          phoneNum: "+33 7 78 90 12 34",
          companyName: "VTC Premium",
          channelName: "Instagram",
          assignedCommercial: "Nicolas Petit",
          status: "active"
        },
        {
          convertedAt: "2023-12-15T16:30:00Z",
          name: "François Durand",
          email: "f.durand@logistique-durand.fr",
          phoneNum: "+33 6 89 01 23 45",
          companyName: "Logistique Durand",
          channelName: "Référence",
          assignedCommercial: "Thomas Bernard",
          status: "risked"
        },
        {
          convertedAt: "2024-02-05T09:45:00Z",
          name: "Céline Lefebvre",
          email: "c.lefebvre@transporteco.com",
          phoneNum: "+33 7 01 23 45 67",
          companyName: "Transport Eco",
          channelName: "Google Ads",
          assignedCommercial: "Sophie Martin",
          status: "onboarding"
        },
        {
          convertedAt: "2024-02-25T11:30:00Z",
          name: "Olivier Martin",
          email: "o.martin@coursiers-express.fr",
          phoneNum: "+33 6 12 34 56 78",
          companyName: "Coursiers Express",
          channelName: "LinkedIn",
          assignedCommercial: "Marie Dubois",
          status: "active"
        }
      ];

      const paginationMeta = useMemo(
        () => ({
          totalRecords: customersList.length ?? 0,
          totalPages: 1,
          currentPage: 1,
          itemPerPage: 20,
        }),
        [customersList.length],
      );
      
      const pagination = useMemo(
        () => ({
          currentPage: paginationMeta.currentPage,
          totalPages: Math.max(1, paginationMeta.totalPages),
          onPageChange: () => {},
          totalEntries: paginationMeta.totalRecords,
          pageSize: 10,
          onPageSizeChange: () => {},
        }),
        [paginationMeta],
      );
      
      const tableColumns: Column<CustomerItem>[] = useMemo<Column<CustomerItem>[]>(
        () => [
          {
            header: "Date de conversion",
            accessor: (item) => new Date(item.convertedAt).toLocaleDateString('fr-FR'),
          },
          {
            header: "Nom",
            accessor: (item) => item.name,
          },
          {
            header: "Email",
            accessor: (item) => item.email,
          },
          {
            header: "Téléphone",
            accessor: (item) => item.phoneNum,
          },
          {
            header: "Entreprise",
            accessor: (item) => item.companyName,
          },
          {
            header: "Canal",
            accessor: (item) => item.channelName,
          },
          {
            header: "Commercial",
            accessor: (item) => item.assignedCommercial,
          },
          {
            header: "Statut",
            accessor: (item) => {           
              return React.createElement(Badge, { 
                type: item.status,
              });
            },
          },
        ],
        [],
      );

      const rowActions = useCallback(
        (item: CustomerItem): RowAction<CustomerItem>[] => {
          const actions: RowAction<CustomerItem>[] = [
            {
              id: "suspend",
              label: "Suspendre",
              onClick: (fleet) => {},
              variant: "ghost",
            },
            {
              id: "debug_mode",
              label: "Mode débogage",
              variant: "vaBlue",
              onClick: (fleet) => {},
            },
          ];         
          return actions;
        },
        [],
      );

      const customersByStatus = useMemo(() => {
        return customersList.reduce((acc, customer) => {
          if (!acc[customer.status]) {
            acc[customer.status] = [];
          }
          acc[customer.status].push(customer);
          return acc;
        }, {} as Record<CustomerStatus, CustomerItem[]>);
      }, [customersList]);

    const kpiItems: KpiItem[]=[
        {
            icon: React.createElement(Users),
            title:"Total Clients",
            value: "245",
            variation:"up",
            hint:"+12% ce mois",
            variant:"light-blue"
        },
        {
            icon: React.createElement(Users),
            title:"Clients Actifs",
            value: "115/245",
            variation:"up",
            hint:"+12% ce mois",
            variant:"green"
        },
        {
            icon: React.createElement(Users),
            title:"Clients à risque",
            value: "30",
            variation:"up",
            hint:"+12% ce mois",
            variant:"red"
        }
    ]

    const handleView  = (cust: CustomerItem)=>{
      setSelectedCustomer(cust);
      setIsDetailsVisible(true);
    }

    return{
        kpiItems,
        tableColumns,
        pagination,
        customersList,
        rowActions,
        customersByStatus,
        handleView,
        setIsDetailsVisible,
        selectedCustomer,
        isDetailsVisible,
    }
}