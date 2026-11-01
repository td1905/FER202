import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <img src={about.logo} alt="logo" width="24" height="24" />
        <span>{about.appName}</span>
        <p className="mb-1">{about.copyright}</p>
        <p className="mb-0">
          <span>{about.version}</span> | <span>{about.course}</span>
        </p>
      </div>
    </footer>
  )
}
