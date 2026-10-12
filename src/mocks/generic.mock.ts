import { LucideIcon } from "lucide-react"
import {
  Code2,
  MonitorSmartphone,
  Database,
  ServerCog,
  CloudCog,
  Network,
  ShieldCheck,
  Smartphone,
  GitBranch,
} from "lucide-react";

export const Country = [
    {
        label: 'Cameroun',
        value: 'cameroun'
    },
    {
        label: 'France',
        value: 'france'
    },
]

export const Cities = [
    {
        label: 'Yaoundé',
        value: 'yaoundé'
    },
    {
        label: 'Douala',
        value: 'douala'
    },
]

export interface SkillItem{
    name: string,
    icon: LucideIcon,
    features: string[],
}

export const skills: SkillItem[] = [
{
    name: "Frontend Development",
    icon: MonitorSmartphone,
    features: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Responsive Design",
      "REST API Integration",
      "Interactive Maps (Leaflet, Geofencing, Tracking)",
    ],
  },
  {
    name: "Backend Development",
    icon: Code2,
    features: [
      "Laravel",
      "PHP",
      "Django",
      "Node.js",
      "REST API Development",
      "Authentication & Authorization",
      "MVC Architecture",
    ],
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    features: [
      "Flutter",
      "Android Deployment",
      "Cross-platform Applications",
      "API Integration",
      "State Management",
    ],
  },
  {
    name: "Database",
    icon: Database,
    features: [
      "MySQL",
      "PostgreSQL",
      "Database Design",
      "Query Optimization",
      "ORM (Eloquent)",
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: CloudCog,
    features: [
      "Docker",
      "CI/CD",
      "Linux Server Deployment",
      "Hostinger VPS",
      "Apache Reverse Proxy",
      "Ansible",
    ],
  },
  {
    name: "System Administration",
    icon: ServerCog,
    features: [
      "Linux Administration",
      "Windows Server",
      "DNS",
      "DHCP",
      "FTP",
      "SMTP",
      "Active Directory",
      "SNMP",
      "Zabbix Monitoring",
    ],
  },
  {
    name: "Networking",
    icon: Network,
    features: [
      "Network Configuration",
      "LAN Infrastructure",
      "Routing",
      "Switching",
      "Network Troubleshooting",
      "Virtualization (VMware, VirtualBox)",
    ],
  },
  {
    name: "Version Control",
    icon: GitBranch,
    features: [
      "Git",
      "GitHub",
      "GitLab",
      "Branching Strategy",
      "Code Review",
    ],
  },
  {
    name: "Software Engineering",
    icon: ShieldCheck,
    features: [
      "Problem Solving",
      "System Architecture",
      "Performance Optimization",
      "Agile Development",
      "Technical Documentation",
    ],
  },
];