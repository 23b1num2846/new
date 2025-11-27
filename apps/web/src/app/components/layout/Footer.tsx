export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        
        <div>
          <h3 className="font-bold text-white text-xl mb-3">YellowBook</h3>
          <p className="text-sm text-zinc-400">
            Connecting Mongolia with trusted local businesses.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">For Businesses</h4>
          <ul className="space-y-2 text-sm">
            <li>List Your Business</li>
            <li>Business Login</li>
            <li>Advertise</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Community Guidelines</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-zinc-500 mt-10">
        © {new Date().getFullYear()} YellowBook. All rights reserved.
      </p>
    </footer>
  );
}
