//
// int m,x,y,o,p,n=480;void setup(){size(480,480);colorMode(3);}void draw(){if(m<1|m>=n*n){set(n-1,n-1,o=p);set(9,9,p=color(random(n),n,n));}for(m=x=0;x<n;x++)for(y=0;y<n;y++)m+=c(o)+c(p);}int c(int l){if(get(x,y)==l){set(int(random(4))-2+x,int(random(4))-2+y,l);return 1;}return 0;}

int m, x, y, o, p, n=480;
void setup() {
  size(480, 480);
  colorMode(3);
}
void draw() {
  if (m<1|m>=n*n) {
    set(n-1, n-1, o=p);
    set(9, 9, p=color(random(n), n, n));
  }
  for (m=x=0; x<n; x++)for (y=0; y<n; y++)m+=c(o)+c(p);
}
int c(int l) {
  if (get(x, y)==l) {
    set(int(random(4))-2+x, int(random(4))-2+y, l);
    return 1;
  }
  return 0;
}
