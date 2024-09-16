import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

function BreadcrumbComp({data,classname}) {

  return (
    <Breadcrumb className='custom_breadcrub_wrapper'>
    {data?.map((item,index)=>{

        return(
            <Breadcrumb.Item  
             key={index}
              linkAs="span"
            
          >
          <Link 
            className={` ${classname} ${index === data.length - 1 ? 'active-breadcrumb' : ''}`}
            to={item.path} 
        
            active={index === item.length - 1} 
          >
            {item.name}
          </Link>
            </Breadcrumb.Item>
        )
    })}
     
    </Breadcrumb>
  );
}

export default BreadcrumbComp;