var cannonball : Transform;
var speed = 4.0;
 
function Update() {
	
	var playerPlane = new Plane(Vector3.up, transform.position);
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	var hitdist = 0.0;
	
	if (playerPlane.Raycast (ray, hitdist)) {
        // Get the point along the ray that hits the calculated distance.
        var targetPoint = ray.GetPoint(hitdist);
 
        // Determine the target rotation.  This is the rotation if the transform looks at the target point.
        var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 
        // Smoothly rotate towards the target point.
        transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, speed * Time.deltaTime);
	
    	if(Input.GetButtonUp("Fire1")) {
        	var projectile = Instantiate(cannonball,
            	                         transform.position,
                	                     transform.rotation);
        	projectile.rigidbody.AddForce(targetPoint * 10000);//cannon's x axis
        	Physics.IgnoreCollision(projectile.collider, collider);
    	}
    }
}