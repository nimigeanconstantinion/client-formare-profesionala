import { PanelMenu } from 'primereact/panelmenu';
import {WrapperMenuGeneral} from "./indexstyle";
import {FormEvent, SyntheticEvent} from "react";


interface MenuGenProp{
    backFunc:Function
}

const MenuGeneral: React.FC<MenuGenProp> = (menuProp) => {
    const items = [
        {
            label: 'Update Date',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'Portofolii',
                    icon: 'pi pi-file',
                    items: [
                        {
                            label: 'Autorizatii',
                            icon: 'pi pi-file-pdf',
                            items: [
                                {
                                    label: 'Pending',
                                    icon: 'pi pi-stop'
                                },
                                {
                                    label: 'Paid',
                                    icon: 'pi pi-check-circle'
                                }
                            ]
                        },
                        {
                            label: 'Nomenclator COR',
                            icon: 'pi pi-align-justify'
                        }
                    ]
                },
                {
                    label: 'Persoane',
                    icon: 'pi pi-user',
                },
                {
                    label: 'Cursuri',
                    icon: 'pi pi-image',
                    items: [
                        {
                            label: 'Adaugare/Modificare',
                            icon: 'pi pi-file-pdf',
                            command:()=>{
                                menuProp.backFunc("cursuri.addmod");
                            }
                        },
                        {
                            label: 'Registrul Matricol',
                            icon: 'pi pi-file-pdf',
                            command:()=>{
                                menuProp.backFunc("cursuri.regMatr");
                            }
                        },
                        {
                            label: 'Gestiune Certificate',
                            icon: 'pi pi-file-pdf',
                        }
                    ]

                },
                {
                    label: 'Cursanti',
                    icon: 'pi pi-image',

                }

            ]
        },
        {
            label: 'Rapoarte',
            icon: 'pi pi-cloud',
            items: [
                {
                    label: 'Upload',
                    icon: 'pi pi-cloud-upload'
                },
                {
                    label: 'Download',
                    icon: 'pi pi-cloud-download'
                },
                {
                    label: 'Sync',
                    icon: 'pi pi-refresh'
                }
            ]
        },
        {
            label: 'Devices',
            icon: 'pi pi-desktop',
            items: [
                {
                    label: 'Phone',
                    icon: 'pi pi-mobile'
                },
                {
                    label: 'Desktop',
                    icon: 'pi pi-desktop'
                },
                {
                    label: 'Tablet',
                    icon: 'pi pi-tablet'
                }
            ]
        }
    ];

    const handleItemSelect = (e:string) => {
        console.log("sjhlkhlskhlkhslkhsdlhlk");
         console.log("Ati ales "+e);
    };

    return (
        <WrapperMenuGeneral>
            <div className="card flex justify-content-center">
                <PanelMenu model={items} className="w-full md:w-20rem" />
            </div>

        </WrapperMenuGeneral>

    )
};

export default MenuGeneral;
