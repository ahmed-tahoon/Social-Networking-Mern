import "foo";

function baz(){
	console.log(foo());
	return import "bar";
}
baz()();