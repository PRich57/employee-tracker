select name
from department
join role on department.id = role.department_id
where 