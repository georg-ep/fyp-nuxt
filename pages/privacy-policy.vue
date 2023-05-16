<template>
  <div class="privacy">
    <div class="section">
      <div class="title">Privacy Policy</div>

      <div>
        We are committed to protecting your data and ensuring that it is used in
        accordance with the Data Protection Act 2018. This privacy policy
        outlines how we collect, protect, and use the information you provide
        when you use our application.
      </div>

      <div class="subtitle">Information We Collect</div>
      <div>We may collect the following information from you:</div>

      <div>
        <ul>
          <li>User login details (email and password)</li>
          <li>Date of Birth</li>
          <li>User-submitted mood data</li>
        </ul>
      </div>
      <div class="subtitle">Use of Your Data</div>
      <div>
        None of the data you provide will be shared with third parties or used
        for market research purposes unless required to do so by law.
      </div>

      <div class="subtitle">Protection of Your Data</div>
      <div>
        We take data protection seriously and ensure that all sensitive and
        personally identifiable information is stored securely. This includes:
      </div>
      <ul>
        <li>
          Encrypting all user login details and personally identifiable
          information using modern encryption methods and standards. This data
          is stored in the database in its encrypted form.
        </li>
        <li>
          Using HTTPS as a secure communication channel to protect the privacy
          and integrity of your data while in transit.
        </li>
        <li>
          Implementing appropriate authentication and authorization safeguards
          to keep your information secure.
        </li>
      </ul>

      <div class="subtitle">External Links</div>
      <div>
        Please be aware that the this application may contain links to external
        websites, and this privacy policy may not apply to the protection of
        personal information entered on these sites. We cannot guarantee the
        protection of any personal information you enter into these sites.
      </div>

      <div class="subtitle">Contacting Us</div>
      <div>
        If you have any questions or concerns about our privacy policy, please
        contact us at gp00482@surrey.ac.uk
      </div>
      <div>You can also use this email address to:</div>

      <ul>
        <li>
          Request details of the personal data we store about you, in accordance
          with the Data Protection Act 1998.
        </li>
        <li>
          Update any out-of-date or incorrect information we have about you.
        </li>
        <li>
          Request the deletion of certain data about yourself (excluding contact
          details), without closing your account.
        </li>
      </ul>
      <div class="subtitle">Updates to Our Privacy Policy</div>
      <div>
        We may update our privacy policy from time to time. An up-to-date
        version of the policy will always be accessible via this application.
      </div>

      Thank you for using this application, and we hope this privacy policy
      gives you peace of mind about how we handle your data.
    </div>
  </div>
</template>

<script>
export default {
  name: "Privacy",
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/privacy-policy.scss";
</style>