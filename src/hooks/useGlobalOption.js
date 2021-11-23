import { graphql, useStaticQuery } from 'gatsby';

const useGlobalOption = () => {

    const resultado = useStaticQuery(
        graphql `
        {
        allWp {
          nodes {
            acfOptionsIdCuentaHubspot {
              idCuentaHubspot {
                idHs
              }
            }
            acfOptionsRedesSociales {
              redesSociales {
                redes {
                  tipoRed
                  url
                }
              }
            }
            acfOptionsServiciosOpcionales {
              serviciosOpcionales {
                servicios {
                  tipoServicio
                  url
                }
              }
            }
          }
        }  
      }
        `
    );
    
    return resultado.allWp.nodes.map( option => ({
        idCuentaHubspot:  option?.acfOptionsIdCuentaHubspot?.idCuentaHubspot?.idHs,
        redesSociales: option?.acfOptionsRedesSociales?.redesSociales?.redes || [],
        serviciosOpcionales: option?.acfOptionsServiciosOpcionales?.serviciosOpcionales?.servicios
    }));
}
 
export default useGlobalOption;